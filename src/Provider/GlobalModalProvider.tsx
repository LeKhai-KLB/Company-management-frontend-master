import {
  createContext,
  CSSProperties,
  Suspense,
  useCallback,
  useContext,
  useState,
} from "react";
import { Spinner } from "~/Components/Elements/Spinner";
import { TBaseModalProps } from "~/Components/Modal/BaseModal";
import { lazyImport } from "~/utils/LazyImport";
import { TWrapperProps } from "~/utils/mixins.type";
import { GLOBAL_MODAL_TYPE } from "~constants/constants.app";
const { BaseModal } = lazyImport(
  () => import("~/Components/Modal/BaseModal"),
  "BaseModal",
);
const { LoginModal } = lazyImport(
  () => import("~/Components/Modal"),
  "LoginModal",
);
const { RegisterModal } = lazyImport(
  () => import("~/Components/Modal"),
  "RegisterModal",
);
const { SidebarModal } = lazyImport(
  () => import("~/Components/Modal"),
  "SidebarModal",
);

export type TModalStore = {
  modalType: GLOBAL_MODAL_TYPE;
  modalConfigProps?: TBaseModalProps;
  modalContentProps?: Record<string, any>;
} | null;

export type TGlobalModalProvider = {
  showModal: (payload: TModalStore) => void;
  hideModal: () => void;
  modalStore: TModalStore;
};

const initializeGlobalModal = {
  showModal: () => {},
  hideModal: () => {},
  modalStore: null,
};

const GlobalModalContext = createContext<TGlobalModalProvider>(
  initializeGlobalModal,
);

const globalModalContainerStyle = {
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
} as CSSProperties;

const globalModalOverlayStyle = {
  width: "100%",
  height: "100%",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  backgroundColor: "black",
  opacity: 0.2,
  zIndex: 1101,
} as CSSProperties;

const renderModal = (store: TModalStore) => {
  if (store) {
    const { modalType, modalConfigProps } = store;

    const currentModalProps = modalConfigProps ? modalConfigProps : {};

    switch (modalType) {
      case GLOBAL_MODAL_TYPE.BASE_MODAL: {
        return <BaseModal {...currentModalProps} />;
      }
      case GLOBAL_MODAL_TYPE.LOGIN_MODAL: {
        return <LoginModal {...currentModalProps} />;
      }
      case GLOBAL_MODAL_TYPE.REGISTER_MODAL: {
        return <RegisterModal {...currentModalProps} />;
      }
      case GLOBAL_MODAL_TYPE.SIDEBAR_MODAL: {
        return <SidebarModal {...currentModalProps} />;
      }
    }
  }
  return null;
};

export const GlobalModalProvider = ({ children }: TWrapperProps) => {
  const [store, setStore] = useState<TModalStore>(null);

  const showModal = useCallback(
    (payload: TModalStore) => {
      setStore(payload);
    },
    // eslint-disable-next-line
    [],
  );

  const hideModal = useCallback(
    async () => {
      store?.modalConfigProps?.onCancel &&
        (await store?.modalConfigProps?.onCancel());
      setStore(null);
    },
    // eslint-disable-next-line
    [],
  );

  return (
    <GlobalModalContext.Provider
      value={{ showModal, hideModal, modalStore: store }}>
      <div
        className="global-modal"
        id="global-modal"
        style={globalModalContainerStyle}>
        {store && (
          <>
            <div
              onClick={hideModal}
              className={"global-modal__overlay"}
              style={globalModalOverlayStyle}
            />
            <Suspense fallback={<Spinner size={40} color="white"></Spinner>}>
              {renderModal(store)}
            </Suspense>
          </>
        )}
        {children}
      </div>
    </GlobalModalContext.Provider>
  );
};

export const useGlobalModal = () => useContext(GlobalModalContext);
