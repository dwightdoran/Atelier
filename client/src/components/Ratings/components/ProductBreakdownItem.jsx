import React from 'react';

const ProductBreakdownItem = (props) => {

  const value = props.star_number;
  const characteristic = props.star_count;
  let label1 = '';
  let label2 = '';
  const triangle_location = 445 * (value / 5);

  if (characteristic === 'Comfort') {
    label1 = 'Poor';
    label2 = 'Perfect'
  } else if (characteristic === 'Fit') {
    label1 = 'Poor';
    label2 = 'Just right'
  } else if (characteristic === 'Length') {
    label1 = 'Too short';
    label2 = 'Too long'
  } else if (characteristic === 'Quality') {
    label1 = 'Poor';
    label2 = 'Great'
  } else if (characteristic === 'Size') {
    label1 = 'Too small';
    label2 = 'Too large'
  } else if (characteristic === 'Width') {
    label1 = 'Too skinny';
    label2 = 'Too wide'
  }

  return (
    <li>
      <br></br>
      <span>{characteristic}</span>
      <span className="characteristic"><img className="triangle" style={{left: triangle_location}}src={'images/triangle.png'} alt='loading' /></span>
      <span className="left" >{label1}</span><span className="right">{label2}</span><br></br><br></br>
    </li>
  );

}

export default ProductBreakdownItem;