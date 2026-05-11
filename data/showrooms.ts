export type Showroom = {
  city: string;
  status: "open" | "coming-soon";
  address: string;
  description: string;
  image: string;
};

export const showrooms: Showroom[] = [
  {
    city: "Madrid",
    status: "open",
    address: "",
    description: "Ven a probarlo antes de decidirte. Un espacio donde puedes sentarlo, tocarlo y ver el sistema modular en acción.",
    image: "/images/showrooms/madrid.png",
  },
  {
    city: "Barcelona",
    status: "open",
    address: "",
    description: "Ven a probarlo antes de decidirte. Un espacio donde puedes sentarlo, tocarlo y ver el sistema modular en acción.",
    image: "/images/showrooms/barcelona.png",
  },
  {
    city: "Sevilla",
    status: "open",
    address: "",
    description: "Ven a probarlo antes de decidirte. Un espacio donde puedes sentarlo, tocarlo y ver el sistema modular en acción.",
    image: "/images/showrooms/sevilla.png",
  },
  {
    city: "Valencia",
    status: "open",
    address: "",
    description: "Ven a probarlo antes de decidirte. Un espacio donde puedes sentarlo, tocarlo y ver el sistema modular en acción.",
    image: "/images/showrooms/valencia.png",
  },
];
