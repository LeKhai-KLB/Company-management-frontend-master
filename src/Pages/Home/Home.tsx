import { memo } from "react";

type THomeProps = {
  greeting?: string;
};

export const Home = memo(({ greeting = "halo" }: THomeProps) => {
  return (
    <div>
      Home: {greeting}
      <div className="card">
        <div className="card-header">Title</div>
        <div className="card-body">Halo</div>
      </div>
    </div>
  );
});
