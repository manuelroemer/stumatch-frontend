function App() {
  return <>
    <Post title="Post 1" text="Post 1 Text" />
    <Post title="" />
    <Post />
    <Post />
    <Post />
    <Post />
  </>;
}

interface PostProps {
  title: string;
  text: string;
}

function Post({ title, text }: PostProps) {
  return <>
    <h1>{props.title}</h1>
    <span>{props.text}</span>
  </>;
}
