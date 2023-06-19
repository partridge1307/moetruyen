import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, signIn } from "next-auth/react";
import PrimaryButton from "@components/Button/PrimaryButton";
import SecondaryButton from "@components/Button/SecondaryButton";
import { Ri24HoursFill } from "react-icons/ri";

const Profile = ({ state, session }) => {
  const { push } = useRouter();

  return (
    <>
      {state.openProfile &&
        (session && session?.user ? (
          <div className="fixed right-0 top-20 z-20 w-56 rounded-xl bg-zinc-700 p-2 py-5 text-center md:right-4 md:w-64">
            <div className="flex flex-col items-center gap-y-3">
              <div className="relative h-16 w-16">
                <Image
                  src={"/manga/1/thumbnail.jpg"}
                  fill={true}
                  sizes="0%"
                  style={{ borderRadius: "9999px", objectFit: "cover" }}
                  alt="Profile Avatar"
                ></Image>
              </div>
              <span>{session.user.username}</span>
              <div className="scrollbar mb-3 flex w-4/5 justify-center overflow-auto">
                {session.user.badge.length ? (
                  <div className="flex h-full max-w-fit items-center justify-end gap-x-2 rounded-lg bg-zinc-800 p-2">
                    {session.user.badge.map((b) => (
                      <span
                        key={b.id}
                        className="relative h-4 w-4 md:h-4 md:w-4"
                        title={`${b.name}`}
                      >
                        <Image
                          src={b.image}
                          alt={`${b.name} Badge`}
                          fill={true}
                          sizes="0%"
                        />
                      </span>
                    ))}
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>

            <div className="text flex flex-col gap-y-4 border-t pt-6 font-semibold">
              <PrimaryButton
                className={"rounded-xl py-2"}
                onClick={() => push("/me")}
              >
                Quản lý
              </PrimaryButton>
              <SecondaryButton
                className={"rounded-xl py-2"}
                onClick={() => signOut()}
              >
                Đăng xuất
              </SecondaryButton>
            </div>
          </div>
        ) : (
          <div className="fixed right-0 top-20 z-20 w-56 rounded-xl bg-zinc-700 p-2 py-5 text-center md:right-4 md:w-64">
            <div className="mb-4">
              <span className="header_text">Khách</span>
            </div>
            <div className="text flex flex-col gap-y-4 border-t pt-6 font-semibold">
              <PrimaryButton
                className={"rounded-xl py-2"}
                onClick={() => signIn()}
              >
                Đăng nhập
              </PrimaryButton>
              <PrimaryButton
                className={"rounded-xl py-2"}
                onClick={() => push("/signUp")}
              >
                Đăng ký
              </PrimaryButton>
            </div>
          </div>
        ))}
    </>
  );
};

export default Profile;
