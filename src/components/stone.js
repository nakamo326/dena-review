export function Stone(props) {
  let color;
  if (props.value === null) color = '';
  else color = props.value === 'X' ? 'stone-color1' : 'stone-color2';
  return (
    <button
      className={'stone ' + color}
      onClick={() => {
        props.onClick();
      }}
    />
  );
}

export default Stone;
