import axios from "axios";
import { useNavigate } from "react-router-dom";

function useTokenVerify(token) {
  const navigate = useNavigate();
  fetch("config.json")
    .then((resp) => resp.json())
    .then((resp) =>
      axios
        .post(
          resp.php.baseUrl + "token_verify.php",
          {
            token,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((resp) => {
          if (resp.data.is_expired) {
            navigate("/login");
            alert("Your token expired. Please login back again");
          } else if (!resp.data.is_valid) {
            navigate("/");
            alert("Your token is not valid");
          }
        })
    )
    .catch(() => {
      navigate("/");
      alert("unexpected error");
    });
}

export default useTokenVerify;
