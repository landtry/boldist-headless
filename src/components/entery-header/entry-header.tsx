import style from "./entry-header.module.css";

type EntryHeaderProps = {
  title: string;
  date?: Date | string;
  author?: string;
};

export default function EntryHeader({ title, date, author }: EntryHeaderProps) {
  return (
    <div className={""}>
      {title && <h2 className={""}>{title}</h2>}

      {date && author && (
        <div className={""}>
          By {author} on <time>{new Date(date).toDateString()}</time>
        </div>
      )}
    </div>
  );
}
