export const ProfileUpdate = async ({ body }) => {
  try {
    const response = await fetch("/api/user/profile", {
      method: "PATCH",
      body: body,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
