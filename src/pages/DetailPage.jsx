import NavBar from "../components/NavBar";
import PostDetails from "../components/PostDetails";
import PostComments from "../components/PostComments";
import { useParams } from "react-router-dom";

export default function DetailPage({ data }) {
  const { id } = useParams();
  const details = data.filter((item) => String(item.id) === id)[0];

  return (
    <div>
      <NavBar />
      <PostDetails details={details} />
      <PostComments details={details} />
    </div>
  );
}
