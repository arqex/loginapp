export function getLinkProps(href: string) {
  const props: any = {};

  if (href.startsWith("#")) {
    props.href = `/#/${href.slice(1)}`;
  } else if (href.startsWith("/")) {
    props.href = `/#${href}`;
  } else {
    props.href = href;
    props.target = "_blank";
    props.rel = "noopener noreferrer";
  }

  return props;
}
