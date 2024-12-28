import { Storage } from "@/app/utils/StorageUtils";

export default function Image({ avatar, h, w, ...props }: any) {
  return (
    <img
      src={
        avatar
          ? Storage(avatar)
          : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
      }
      className={`w-${w} h-${h} rounded-full`}
      {...props}
    />
  );
}
