import { gql } from "@apollo/client/core";

export const GET_STATES = gql`
  query {
    states {
      id
      name
      Markazs {
        name
        id
      }
    }
  }
`;
export const ADD_STATE = gql`
  mutation newState($name: String!) {
    addState(name: $name) {
      name
      id
    }
  }
`;
export const CHANGE_STATE = gql`
  mutation editState($id: ID!, $name: String!) {
    changeName(id: $id, name: $name) {
      name
      id
      Markazs {
        name
        id
      }
    }
  }
`;
export const REMOVE_STATE = gql`
  mutation removeState($id: ID!) {
    removeState(id: $id)
  }
`;

export const ADD_MARKAZ = gql`
  mutation newMarkaz($name: String!, $StateId: ID!) {
    addMarkaz(name: $name, StateId: $StateId) {
      name
      id
    }
  }
`;
export const CHANGE_MARKAZ = gql`
  mutation editMarkaz($id: ID!, $name: String!) {
    changeMarkazName(id: $id, name: $name) {
      name
      id
    }
  }
`;
export const REMOVE_MARKAZ = gql`
  mutation removeMarkaz($id: ID!) {
    removeMarkaz(id: $id)
  }
`;

export const GET_COURTS = gql`
  query getCourts($MarkazId: ID!) {
    courts(MarkazId: $MarkazId) {
      id
      name
      Halls {
        id
        number
        rollNumber
        official
        friday
        saturday
        sunday
        monday
        tuesday
        wednesday
        thursday
      }
    }
  }
`;
export const ADD_COURT = gql`
  mutation newCourt($name: String!, $MarkazId: ID!) {
    addCourt(name: $name, MarkazId: $MarkazId) {
      id
      name
    }
  }
`;

export const CHANGE_COURT = gql`
  mutation editCourt($id: ID!, $name: String!) {
    changeCourtName(id: $id, name: $name) {
      name
      id
    }
  }
`;

export const REMOVE_COURT = gql`
  mutation removeCourt($id: ID!) {
    removeCourt(id: $id)
  }
`;

export const ADD_HALL = gql`
  mutation newHALL($number: Int!, $CourtId: ID!) {
    addHall(number: $number, CourtId: $CourtId) {
      id
      number
      rollNumber
      official
      friday
      saturday
      sunday
      monday
      tuesday
      wednesday
      thursday
    }
  }
`;
export const GET_HALL = gql`
  query hall($id: ID!) {
    hall(id: $id) {
      id
      number
      rollNumber
      official
      friday
      saturday
      sunday
      monday
      tuesday
      wednesday
      thursday
    }
  }
`;
export const GET_COURT = gql`
  query getCourt($id: ID!) {
    court(id: $id) {
      id
      name
      Halls {
        id
        number
        rollNumber
        official
        friday
        saturday
        sunday
        monday
        tuesday
        wednesday
        thursday
      }
    }
  }
`;
export const REMOVE_HALL = gql`
  mutation removeHall($id: ID!) {
    removeHall(id: $id)
  }
`;

export const UPDATE_HALL = gql`
  mutation updateHall($days: Days, $official: String, $id: ID!) {
    updateHall(days: $days, official: $official, id: $id) {
      id
      number
      rollNumber
      official
      friday
      saturday
      sunday
      monday
      tuesday
      wednesday
      thursday
    }
  }
`;

export const GET_NEWS = gql`
  query {
    news {
      id
      text
    }
  }
`;
export const ADD_NEWS = gql`
  mutation addNews($text: String!) {
    addNews(text: $text) {
      id
      text
    }
  }
`;
export const UPDATE_NEW = gql`
  mutation updateNews($id: ID!, $text: String!) {
    updateNews(text: $text, id: $id)
  }
`;
export const REMOVE_NEWS = gql`
  mutation removeNews($id: ID!) {
    removeNews(id: $id)
  }
`;

export const GET_USER = gql`
  mutation user($username: String!) {
    user(username: $username) {
      id
      username
      password
      isAdmin
    }
  }
`;
export const GET_USERS = gql`
  query {
    users {
      id
      name
      facebookId
      isAdmin
      isAllowed
      allowedTo
      email
      pic
    }
  }
`;
export const ADD_USER = gql`
  mutation addUser($username: String!, $password: String!, $isAdmin: Boolean!) {
    addUser(username: $username, password: $password, isAdmin: $isAdmin) {
      id
    }
  }
`;
export const REMOVE_USER = gql`
  mutation removeUser($id: ID!) {
    removeUser(id: $id)
  }
`;

export const SUBSCRIBE_HALL = gql`
  subscription hall($hallId: ID!) {
    rollNumber(hallId: $hallId)
  }
`;

export const UPDATE_ROLLNUMBER = gql`
  mutation updateRollNumber($hallId: ID!, $number: Int!) {
    updateRollNumber(hallId: $hallId, number: $number)
  }
`;

export const GET_HALLS = gql`
  query getHalls($CourtId: ID!) {
    halls(CourtId: $CourtId) {
      id
      number
      rollNumber
      official
      friday
      saturday
      sunday
      monday
      tuesday
      wednesday
      thursday
    }
  }
`;

export const IS_AUTHENTICATED = gql`
  query is {
    me {
      id
      name
      facebookId
      isAdmin
      isAllowed
      allowedTo
      email
    }
  }
`;

export const ADMINIFY_USER = gql`
  mutation adminify($id: ID!, $state: Boolean!) {
    adminifyUser(id: $id, state: $state) {
      id
    }
  }
`;
export const ALLOW_USER = gql`
  mutation allow($id: ID!, $state: Boolean!) {
    allowUser(id: $id, state: $state) {
      id
    }
  }
`;
export const ALLOWED_TO = gql`
  mutation allowTo($id: ID!, $allowTo: String!) {
    setAllowTo(id: $id, allowTo: $allowTo) {
      id
    }
  }
`;

export const UPLOAD_IMAGE = gql`
  mutation upload($image: Upload!, $date: String!) {
    uploadImage(image: $image, date: $date) {
      id
      filename
      date
    }
  }
`;
export const GET_IMAGES = gql`
  query getImages($date: String) {
    images(date: $date) {
      id
      filename
      date
    }
  }
`;
export const REMOVE_IMAGE = gql`
  mutation remove($id: ID!) {
    removeImage(id: $id)
  }
`;

export const GET_SETTINGS = gql`
  query {
    settings {
      id
      court_rollNumberSize
      hall_rollNumberSize
      court_paddinTop
      court_titleSize
      hall_titleSize
      court_specialitySize
      hall_specialitySize
      hall_officialNameSize
      court_officailNameSize
      newsBarTime
    }
  }
`;
export const UPDATE_SETTINGS = gql`
  mutation updateSetting(
    $court_rollNumberSize: Int
    $hall_rollNumberSize: Int
    $court_paddinTop: Int
    $court_titleSize: Int
    $hall_titleSize: Int
    $court_specialitySize: Int
    $hall_specialitySize: Int
    $hall_officialNameSize: Int
    $court_officailNameSize: Int
    $newsBarTime: Int
  ) {
    changeSettings(
      court_rollNumberSize: $court_rollNumberSize
      hall_rollNumberSize: $hall_rollNumberSize
      court_paddinTop: $court_paddinTop
      court_titleSize: $court_titleSize
      hall_titleSize: $hall_titleSize
      court_specialitySize: $court_specialitySize
      hall_specialitySize: $hall_specialitySize
      hall_officialNameSize: $hall_officialNameSize
      court_officailNameSize: $court_officailNameSize
      newsBarTime: $newsBarTime
    )
  }
`;
