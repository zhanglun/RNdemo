import React, { Component } from 'react';
import {
  ListView,
  ScrollView,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';

export default class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: null,
    };
  }

  componentWillMount() {}

  componentDidMount() {
    let { navigator, route } = this.props;
    let { id } = route;
    let detailPromise = this.fetchMovieDetail(id);
    detailPromise.then((data) => {
      this.setState({
        detail: data,
      });
    });
  }

  fetchMovieDetail(id) {
    let url= `https://api.douban.com/v2/movie/subject/${id}`;
    return fetch(url, {
      method: 'GET',
    }).then((res) => {
      return res.json();
    });
  }

  render() {
    let { detail } = this.state;
    if (!detail) {
      return (
        <View style={styles.loadingContainer}>
        <Text>正在加载电影数据……</Text>
        </View>
      );
    }
    return (
      <View style={styles.viewContainer}>
      <View>
      <Text>{detail.title}</Text>
      </View>
      <Image
      source={{uri: detail.images.large}}
      style={styles.thumbnail}
      />
      <View>
      <Text>{detail.summary}</Text>
      </View>
      </View>
    );
  }

}

const styles = {
  viewContainer: {
    flex: 1,
    paddingTop: 84,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumbnail: {
    width: 100,
    height: 140,
  }
};
