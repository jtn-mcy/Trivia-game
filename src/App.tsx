/** @jsxImportSource @emotion/react */
import { ReactComponent as Logo } from "./IndeedLogo.svg";

export default function App() {
  return (
    <div css={{ padding: "0 16px" }}>
      <Logo />
      <p css={{ fontFamily: "Roboto" }}>
        Hello candidate. Welcome to the Indeed Design Engineering take home
        exercise. You will find directions to get started in the readme file.
        After reviewing the readme, please reach out to your recruiter with any
        questions.
      </p>
    </div>
  );
}
