interface RawProps {
  children: React.ReactNode;
}

function Row(props: RawProps) {
  return <div className="row">{props.children}</div>;
}

export default Row;
