import React, { Component } from 'react';
import {
  ListView,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';

export default class ListViewBasics extends Component {
  // 初始化模拟数据
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      loaded: false,
    };
  }

  componentDidMount() {
    let moviePromise = this.fetchMovieList();
    let ds = this.state.dataSource;
    moviePromise.then((data) => {
      let { title, subjects } = data;
      this.setState({
        dataSource: ds.cloneWithRows(subjects),
        loaded: true,
      });

    });
  }

  fetchMovieList() {
    let url = 'https://api.douban.com/v2/movie/top250';
    return fetch(url, {
      method: 'GET',
    }).then((res) => {
      console.log(typeof res);
      return res.json();
    });
  }

  renderLoadingView() {
    return (
      <View style={styles.loadingContainer}>
      <Text>
      正在加载电影数据……
      </Text>
      </View>
    );
  }

  renderMovieItem(movie) {
    console.log(movie);
    return (
      <View style={styles.container}>
      <Image
      source={{uri: movie.images.large}}
      style={styles.thumbnail}
      />
      <View style={styles.rightContainer}>
      <View style={styles.titleContainer}>
      <Text style={styles.title}>{movie.title}({movie.original_title})</Text>
      </View>
      <Text>类型：{movie.genres}</Text>
      <Text style={styles.year}>上映时间：{movie.year}</Text>
      </View>
      </View>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View>
      <ListView
      style={{flex: 1, paddingTop: 64}}
      dataSource={this.state.dataSource}
      renderRow={this.renderMovieItem}
      />
      </View>
    );
  }
};

const styles ={
  container: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    borderBottomColor: '#d4d4d4',
    borderBottomWidth: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    flex: 1,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
  },
  year: {
  },
  thumbnail: {
    width: 80,
    height: 120,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
};

