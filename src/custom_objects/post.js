export default class Post {

  constructor(props) {
    super(props);
    this.state = {
        postText: '',
        imageUri: '',
        userId: 0,
        timestamp:0,
    };
  }
}
