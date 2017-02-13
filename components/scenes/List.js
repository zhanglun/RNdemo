import React, { Component } from 'react';
import {
  ListView,
  ScrollView,
  Text,
  View,
  Image,

  Alert,
  TouchableOpacity,
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

  /**
    * 在组件首次调用（render）之前调用。
    * 在此处对this.state进行更新，无法触发重新渲染组件。
    */
  componentWillMount() {
  }

  /**
    * 组件首次加载完成之后便会调用。
    * 此时设置state将会导致组件重新被渲染
    */
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
      return res.json();
    });
  }

  /**
    * movie 项点击
    */
  onItemPressed(movie) {
    let { navigator, route } = this.props;
    navigator.push({
      type: 'detail',
      title: movie.title,
      index: route.index + 1,
      id: movie.id,
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
    return (
      <TouchableOpacity onPress={() => {
        this.onItemPressed(movie);
      }} style={styles.container}>
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
      </TouchableOpacity>
    );
  }

  render() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View>
        <ListView
        style={styles.listView}
        dataSource={this.state.dataSource}
        renderRow={this.renderMovieItem.bind(this)}
        automaticallyAdjustContentInsets={false}
        />
      </View>
    );
  }
};

const styles ={
  listView: {
    flex: 1,
    paddingTop: 84,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
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
};

