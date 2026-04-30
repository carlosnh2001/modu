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
    address: "Dirección próximamente",
    description: "Ven a probarlo antes de decidirte.",
    image: "/images/showrooms/madrid.png",
  },
  {
    city: "Barcelona",
    status: "open",
    address: "Dirección próximamente",
    description: "Ven a probarlo antes de decidirte.",
    image: "/images/showrooms/barcelona.png",
  },
  {
    city: "Sevilla",
    status: "open",
    address: "Dirección próximamente",
    description: "Ven a probarlo antes de decidirte.",
    image: "/images/showrooms/sevilla.png",
  },
  {
    city: "Valencia",
    status: "open",
    address: "Dirección próximamente",
    description: "Ven a probarlo antes de decidirte.",
    image: "/images/showrooms/valencia.png",
  },
];
