"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { resizeImage } from "@utils/util";
import { ProfileUpdate } from "@services/user";
import { useRouter } from "next/navigation";
import { BiImageAdd } from "react-icons/bi";
import Header from "@components/Header/Header";
import ImageCropModal from "@components/Modal/ImageCropModal";
import PrimaryButton from "@components/Button/PrimaryButton";
import SecondaryButton from "@components/Button/SecondaryButton";

const Me = () => {
  const { push } = useRouter();
  const { data: session, status, update } = useSession({ required: true });
  const [chage, setChange] = useState(false);
  const [modal, setModal] = useState({
    state: true,
    type: "",
    aspectRatio: 1 / 1,
  });
  const [image, setImage] = useState({
    banner: "",
    avatar: "",
  });

  useEffect(() => {
    if (image.banner || image.avatar) {
      setChange(true);
    }
  }, [image]);

  if (status === "loading")
    return (
      <div className="relative top-16 h-1/2 md:top-0">
        <div className="animate-pulse">
          <div className="absolute left-4 top-1/2 h-24 w-24 rounded-full bg-zinc-600 md:left-6"></div>
          <div className="h-56 bg-zinc-700"></div>
        </div>
      </div>
    );

  const onSubmitHandler = async () => {
    const body = new FormData();
    if (image.banner) {
      const resizedBanner = await resizeImage(image.banner);
      body.append("banner", resizedBanner);
    }
    if (image.avatar) {
      const resizedAvt = await resizeImage(image.avatar);
      body.append("image", resizedAvt);
    }
    const newProfile = await ProfileUpdate({
      body,
    });

    if (newProfile) {
      alert("Đã cập nhật thành công");
      await update();
      setImage({ image: "", banner: "" });
      setChange(false);
    } else {
      alert("Có lỗi xảy ra");
      setImage({ image: "", banner: "" });
      setChange(false);
    }
  };

  const onCloseModal = (state, type, aspect) => {
    setModal({ state: state, type: type, aspectRatio: aspect });
  };

  const onCroppedImage = (image) => {
    if (modal.type && modal.type === "banner")
      setImage((pre) => ({ banner: image, avatar: pre.avatar }));
    if (modal.type && modal.type === "avatar")
      setImage((pre) => ({ banner: pre.banner, avatar: image }));
  };

  console.log(session);

  return (
    <>
      <Header session={session} />
      <main className="m-auto h-fit w-full md:w-[80%]">
        <div className="relative top-16 h-fit md:top-0 md:h-full">
          <ImageCropModal
            onCloseModal={onCloseModal}
            modal={modal}
            onCroppedImage={onCroppedImage}
          />
          {chage && (
            <div className="fixed bottom-5 z-50 flex h-14 w-full items-center justify-end gap-x-3 rounded-md bg-zinc-800 px-3 md:left-1/2 md:w-96 md:-translate-x-1/2">
              <SecondaryButton
                onClick={() => {
                  setImage({ image: "", banner: "" }), setChange(false);
                }}
                className={"rounded-md p-2 px-3"}
              >
                Hủy
              </SecondaryButton>
              <PrimaryButton
                className={"rounded-md p-2"}
                onClick={onSubmitHandler}
              >
                Xong
              </PrimaryButton>
            </div>
          )}
          {/* Profile */}
          <div
            className="absolute left-4 top-[20%] z-10 h-28 w-28 rounded-full border-8 border-zinc-700 md:left-6 md:top-1/4 md:h-36 md:w-36"
            onClick={() => setModal({ state: false, type: "avatar" })}
          >
            <i className="float-right translate-x-1 rounded-full bg-zinc-500 p-1 text-2xl">
              <BiImageAdd />
            </i>
            {!image.avatar ? (
              session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={`${session.user.image} Avatar`}
                  priority
                  fill={true}
                  sizes="0%"
                  style={{ borderRadius: "9999px" }}
                />
              ) : (
                <Image
                  src={"/assets/images/default.jpg"}
                  alt="Default Avatar"
                  priority
                  fill={true}
                  sizes="0%"
                  style={{ objectFit: "cover", borderRadius: "9999px" }}
                />
              )
            ) : (
              <Image
                src={image.avatar}
                alt="New Avatar"
                fill={true}
                sizes="0%"
                style={{ borderRadius: "9999px" }}
              />
            )}
          </div>
          {/* Banner */}
          <div
            className="relative h-56 hover:opacity-70"
            onClick={() =>
              setModal({ state: false, type: "banner", aspectRatio: 16 / 9 })
            }
          >
            <i className="absolute right-0 z-10 rounded-full bg-zinc-500 p-1 text-2xl">
              <BiImageAdd />
            </i>
            {!image.banner ? (
              session.user.banner ? (
                <Image
                  src={session.user.banner}
                  alt={`${session.user.banner} Banner`}
                  priority
                  fill={true}
                  sizes="0%"
                />
              ) : (
                <Image
                  src={"/assets/images/default.jpg"}
                  alt="Default Banner"
                  priority
                  fill={true}
                  sizes="0%"
                  style={{ objectFit: "cover" }}
                />
              )
            ) : (
              <Image
                src={image.banner}
                alt="New Banner"
                fill={true}
                sizes="0%"
              />
            )}
          </div>
          <div className="relative h-full w-full">
            {/* Badge */}
            <div className="mt-2 flex h-8 justify-end pr-4 md:mt-6 md:h-10">
              {session.user.badge.length ? (
                <div className="flex h-full max-w-fit items-center justify-end gap-x-2 rounded-lg bg-zinc-700 p-2">
                  {session.user.badge.map((b) => (
                    <span
                      key={b.id}
                      className="relative h-4 w-4 md:h-6 md:w-6"
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
            {/* Profile info */}
            <div className="mt-10 h-fit rounded-md bg-zinc-700 px-4 py-4 md:mt-14 md:p-6">
              <div className="md:flex md:justify-between">
                {/* Username */}
                <div
                  className="md:text-3x w-fit text-2xl font-bold max-sm:mb-4 md:ml-2"
                  style={{
                    color: `${
                      session.user.badge.length && session.user.badge[0].color
                    }`,
                  }}
                >
                  {session.user.username}
                </div>
                {/* Guild */}
                {session.user.guild.length ? (
                  <div className="rounded-md bg-zinc-800 p-2">
                    <h1 className="mb-2 px-2 text-xl">Team</h1>
                    <div className="scrollbar flex h-fit max-h-72 flex-col gap-y-4 overflow-y-auto p-2">
                      {session.user.guild.map((g) => (
                        <Link
                          key={g.guild.id}
                          href={`/guild/${g.guild.id}`}
                          className="flex items-center justify-center gap-x-4 rounded-lg bg-zinc-600 p-2 md:w-64"
                        >
                          <div className="relative h-14 w-14">
                            <Image
                              src={g.guild.image}
                              alt={`${g.guild.image} Avatar`}
                              fill={true}
                              sizes="0%"
                              style={{ borderRadius: "9999px" }}
                            />
                          </div>
                          <span className="max-w-[70%] truncate">{`${
                            g.guild.id === session.user.owner.id
                              ? "(Owner)"
                              : ""
                          } ${g.guild.name}`}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
              <div className="mt-10 h-fit w-fit rounded-md bg-zinc-800 p-2 max-sm:flex max-sm:w-full max-sm:flex-col max-sm:items-stretch max-sm:gap-y-4 max-sm:p-4 md:space-x-4">
                <PrimaryButton
                  className={"rounded-md p-2"}
                  onClick={() => push("/me/manga")}
                >
                  Quản lý truyện
                </PrimaryButton>
                {session.user.owner && (
                  <PrimaryButton
                    className={"rounded-md p-2"}
                    onClick={() => push("/me/guild")}
                  >
                    Quản lý guild
                  </PrimaryButton>
                )}
                <PrimaryButton
                  className={"rounded-md p-2"}
                  onClick={() => push("/me/account")}
                >
                  Thiết lập tài khoản
                </PrimaryButton>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Me;
