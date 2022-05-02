import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import _ from 'underscore';
import "regenerator-runtime/runtime.js";

import ProductInfo from './components/ProductInfo.jsx';
import StyleSelector from './components/StyleSelector.jsx';
import AddToCart from './components/AddToCart.jsx';
import ImageGallery from './components/ImageGallery.jsx';
import ProductDescription from './components/ProductDescription.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productData : '',
      styleData : '',
      photo: '',
      selectedStyle: 0,
      currentPhoto: 0,
      numberOfPhotos: 0,
    };
  }

  grabProductData = async () => {
    await axios.get(`products/${this.props.itemid}`)
      .then((result) => {
        this.setState({
          productData : result.data
        });
      })
      .catch((err) => {
        console.error(err.message)
      });
  }

  grabStylesData = async () => {
    await axios.get(`products/${this.props.itemid}/styles`)
    .then((result) => {
      this.setState({
        styleData : result.data.results,
        photo: result.data.results[0].photos[0].url,
        numberOfPhotos: result.data.results[0].photos.map(style => style.photos).length
      });
      })
      .catch((err) => {
        console.error(err.message);
      });
  }

  cycleForward = (e) => {
    this.props.render(e);
    let max = this.state.numberOfPhotos;
    let current = this.state.currentPhoto;
    this.state.currentPhoto < max - 1 ?
    this.setState({
      photo: this.state.styleData[this.state.selectedStyle].photos[current + 1].url,
      currentPhoto: this.state.currentPhoto + 1,
      minIndex: this.state.minIndex + 1
    }) :
    null
  }

  cycleBackward = (e) => {
    this.props.render(e);
    let max = this.state.numberOfPhotos;
    let current = this.state.currentPhoto;
    this.state.currentPhoto > 0 ?
    this.setState({
      photo: this.state.styleData[this.state.selectedStyle].photos[current - 1].url,
      currentPhoto: this.state.currentPhoto - 1,
      minIndex: this.state.minIndex - 1
    }) :
    null
  }

  changePhoto = (e) => {
    e.preventDefault();
    this.props.render(e);
    if (this.state.currentPhoto >= this.state.styleData[this.state.selectedStyle].photos.length - 7) {
      let subtractor = this.state.styleData[this.state.selectedStyle].photos.length - 7
      this.setState((state, props) => ({
        photo: state.styleData[state.selectedStyle].photos[Number(e.target.id) + subtractor].url,
        currentPhoto: Number(e.target.id) + subtractor
      }))
    } else {
      this.setState((state, props) => ({
        photo: state.styleData[state.selectedStyle].photos[Number(e.target.id) + state.currentPhoto].url,
        currentPhoto: Number(e.target.id) + state.currentPhoto
      }))
    }
  }

  handleSelectStyle = (e) => {
    this.props.render(e);
    let current = this.state.currentPhoto;
    let currentStyle = e.target.id;
    let currentPhoto = this.state.currentPhoto;
    this.setState({
      selectedStyle: currentStyle,
      photo: this.state.styleData[currentStyle].photos[current].url
    });
  }

  componentDidMount() {
    this.grabProductData();
    this.grabStylesData();
  }

  render() {
    return (
      <div data-testid='overview-widget' id="overview">
        <ProductInfo render={this.props.render} itemid={this.props.itemid} productData={this.state.productData}
          originalPrice={this.state.styleData[this.state.selectedStyle] !== undefined ?
            this.state.styleData[this.state.selectedStyle].original_price : null}
          salePrice={this.state.styleData[this.state.selectedStyle] !== undefined ?
            this.state.styleData[this.state.selectedStyle].sale_price : null} />

        <ImageGallery render={this.props.render} styleData={this.state.styleData} photo={this.state.photo}
          selectedStyle={this.state.selectedStyle}
          forward={this.cycleForward} backward={this.cycleBackward}
          changePhoto={this.changePhoto}
          currentPhoto={this.state.currentPhoto}/>

        <StyleSelector render={this.props.render} styleImgs={_.map(this.state.styleData, style => style.photos).map(arr => arr[0].thumbnail_url)}
          selectStyle={this.handleSelectStyle}
          styleName={this.state.styleData[this.state.selectedStyle] !== undefined ?
          this.state.styleData[this.state.selectedStyle].name : null}
          selectedStyle={Number(this.state.selectedStyle)}/>

        <AddToCart render={this.props.render} productName={this.state.productData.name} styleData={this.state.styleData[this.state.selectedStyle]}
        addToOutfit={this.props.addToOutfit}/>

        {this.state.productData.description !== undefined ?
        <ProductDescription desc={this.state.productData.description}></ProductDescription> : null}
      </div>
    )
  }
}

export default Overview;
