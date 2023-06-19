// Convert Base64 to Blob, remove size
const b64toBlob = (b64Data, sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];
  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);
    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: "image" });
  return blob;
};

export const timeDistance = (date1, date2, type) => {
  let distance = Math.abs(date1 - date2);

  const hours = Math.floor(distance / 3600000);
  distance -= hours * 3600000;

  const minutes = Math.floor(distance / 60000);
  distance -= minutes * 60000;

  if (type === "full") return `${hours} giờ ${("0" + minutes).slice(-2)} phút`;
  else if (type === "hour") return `${hours} giờ`;
};

export const formatTime = (date) => {
  const d = new Date(date);

  const hours = d.getHours();
  const day = d.getDay();
  const month = d.getMonth();
  const year = d.getFullYear();

  return `${hours}h ${day}/${month}/${year}`;
};

// Must be an array
export const sendToDisc = async (base64Images) => {
  let images = [];
  for (const b64Image of base64Images) {
    if (b64Image) {
      const b64 = b64Image.split(",")[1];
      images.push(b64toBlob(b64));
    }
  }

  const headers = new Headers();
  const formData = new FormData();
  images.map((img, i) => formData.append(`file-${i}`, img, `${i}.png`));
  // formData.append("payload_json", JSON.stringify({ content: "image" })); content message

  const response = await fetch(process.env.DISCORD_WH, {
    method: "POST",
    headers,
    body: formData,
    redirect: "follow",
  }).catch((e) => console.log(e));

  return response.text();
};

// Resiez Image
export const resizeImage = (data) => {
  return new Promise((r) => {
    let dst, ctx, width, _data;
    let img = new Image();
    img.src = data;
    img.onload = () => {
      width = 300;
      dst = document.createElement("canvas");
      ctx = dst.getContext("2d");
      dst.width = width;
      dst.height = (img.height * width) / img.width;
      ctx.drawImage(img, 0, 0, dst.width, dst.height);
      _data = dst.toDataURL();
      r(_data);
    };
  });
};
