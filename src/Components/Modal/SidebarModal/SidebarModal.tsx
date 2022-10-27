import { useEffect } from "react";
import { useGetItemBelongsMediaQuery } from "~/hooks/media-query";
import { Sidebar } from "~/Layout/Components/Sidebar";
import { useGlobalModal } from "~/Provider/GlobalModalProvider";
import { BaseModal, TBaseModalProps } from "../BaseModal";

export const SidebarModal = (props: TBaseModalProps) => {
  const { modalStore, hideModal } = useGlobalModal();
  const [currentItem] = useGetItemBelongsMediaQuery(["extra-small", "small"], {
    autoGetOtherItem: false,
  });

  const sidebarProps =
    modalStore && modalStore.modalContentProps
      ? modalStore.modalContentProps
      : {};

  const handleDirect = async (index: number) => {
    sidebarProps.onDirect && (await sidebarProps.onDirect(index));
    hideModal();
  };

  useEffect(() => {
    if (!currentItem) {
      hideModal();
    }
  }, [currentItem, hideModal]);

  return (
    <BaseModal
      position={"left"}
      title={"TABS"}
      showCancelButton={false}
      showConfirmButton={false}>
      <Sidebar
        fullWidth
        {...sidebarProps}
        onDirect={handleDirect}
        containedByModal
      />
    </BaseModal>
  );
};
