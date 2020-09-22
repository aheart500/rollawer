import { gql, useMutation } from "@apollo/client";
import moment from "moment";
import React from "react";
let today = moment().format("YYYY-MM-DD");
const UPLOAD = gql`
  mutation uplaod($image: Upload!, $date: String!) {
    uploadImage(image: $image, date: $date) {
      id
      filename
      date
    }
  }
`;
const Index = () => {
  const [mutate] = useMutation(UPLOAD);

  const onChange = ({
    target: { validity, files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files) {
      console.log(files);
      if (validity.valid)
        mutate({ variables: { image: files[0], date: today } }).then(
          ({ data }) => {
            console.log(data);
          }
        );
    }
  };

  return (
    <div>
      <input type="file" required onChange={onChange} />
      <input
        type="date"
        value={today}
        onChange={(e) => console.log(e.target.value)}
      />
    </div>
  );
};

export default Index;
