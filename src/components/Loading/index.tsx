type Props = {
  loading: boolean;
};

export const Loading = ({ loading }: Props) => {
  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75">
        <div className="flex items-center justify-center gap-6">
          <div className="size-10 animate-spin rounded-full border-[5px] border-sky-400 border-t-transparent"></div>
          <p className="font-weight text-[30px] text-white">Loading...</p>
        </div>
      </div>
    );

  return null;
};
