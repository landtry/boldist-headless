export const RawHtml = ({ html = '' }) => (
  <script dangerouslySetInnerHTML={{ __html: `</script>${html}<script>` }} />
);
