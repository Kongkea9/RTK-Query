import { Link } from "react-router";

export default function CardProduct({ thumbnail, title, id }) {

  return (
    <Link
      to={`/products/${id}`}
      className="overflow-hidden rounded bg-white text-slate-500 shadow-md shadow-slate-200"
    >
      <figure>
        <img
          src={thumbnail}
          alt={`Image of ${title}`}
          className="aspect-video w-full object-cover h-[280px]"
          loading="lazy"
        />
     
      </figure>
      <div className="p-6">
        <header>
          <h3 className="text-xl font-medium text-slate-700">{title}</h3>
        </header>
      </div>
    </Link>
  );
}
