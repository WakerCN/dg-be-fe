type Props = {
  msg: string
}

const Hello = (props: Props) => {
  return <h1>{props.msg}</h1>
}

export default Hello
