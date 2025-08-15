export default function PageMetaData({
  title = "FreshCart",
  description = "FreshCart - Your one-stop shop for fresh groceries",
  keywords = "groceries, fresh, online shopping, delivery",
  author = "FreshCart Team",
}) {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
    </>
  );
}
