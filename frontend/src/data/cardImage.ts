export type CardImage = {
  src: string;
  alt: string;
};

export type CardImages = readonly [CardImage, CardImage, CardImage];

export const CARD_IMAGES: CardImages = [
  { src: 'https://imgs.search.brave.com/elKtFvWJZjnJeVkQO2CtktnrqiOUeDewVR8vt5xhVys/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMx/OTAxMDUxMC9waG90/by9wcm9qZWN0LWxl/YWRlci1hbmQtY2hp/ZWYtZXhlY3V0aXZl/LWRpc2N1c3MtZGF0/YS1zaG93bi1vbi1h/LWxhcHRvcC1pbi1i/YWNrZ3JvdW5kLWJp/Zy1zY3JlZW4uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPTM5/UUpwRV8waUpyUHVG/Mi1NSzJtSThncXRD/MHFpZ2tGVi1jR3R5/TEttNjA9', alt: "Left card" },
  { src: 'https://imgs.search.brave.com/QAxp7-RzszlT9IABOAFNCd7MfQbMU2IvkWIrdTDAlF8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjIx/ODc5MjcwNi9waG90/by93b21lbi1pbi10/ZWNoLWNvbGxhYm9y/YXRlLW9uLXVpLXJl/dmlldy13aXRoLXRh/YmxldC1hbmQtY29k/aW5nLW1vbml0b3Jz/LWluLWJhY2tncm91/bmQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPTM3TXp3MDhY/TmFmWTEzXy1Ramtp/dDAxbGJMMWRtNGx3/SmhKakxzNVdEZ2c9', alt: "Center card" },
  { src: 'https://imgs.search.brave.com/MGFN_wzY21VjM1j_UBNCxhb5SAxbozcOofVYZ1rypm0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE2/NjE4MzE4NS9waG90/by9hcnRpZmljaWFs/LWludGVsbGlnZW5j/ZS1kZXZlbG9wZXIt/dGVhbS1tZWV0aW5n/LWF0LW5pZ2h0Lmpw/Zz9zPTYxMng2MTIm/dz0wJms9MjAmYz1I/enppSWtSTWtfMmVp/Skk4MURvV0FxbG1L/VEV2MGM5NGY3Y0lP/WGg3UzJJPQ', alt: "Left card" },

];