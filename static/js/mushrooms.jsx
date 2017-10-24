import React, { Component } from 'react';
import axios from 'axios';

class Mushrooms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPrediction: 'none'
    }
  }
  
  handleInputChange = (event) =>  {
    const { value } = event.target;
    const name = event.target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = () => {
    
    axios.post('/api/mushrooms', {
      data: [
        this.state.capShape,
        this.state.capSurface,
        this.state.capColor,
        this.state.bruises,
        this.state.odor,
        this.state.gillAttachment,
        this.state.gillSpacing,
        this.state.gillSize,
        this.state.gillColor,
        this.state.stalkShape,
        this.state.stalkRoot,
        this.state.stalkSurfaceAboveRing,
        this.state.stalkSurfaceBelowRing,
        this.state.stalkColorAboveRing,
        this.state.stalkColorBelowRing,
        this.state.veilType,
        this.state.veilColor,
        this.state.ringNumber,
        this.state.ringType,
        this.state.sporePrintColor,
        this.state.population,
        this.state.habitat,
      ]
    }).then((results) => {
      results.data.prediction === 1 ? this.setState({currentPrediction: 'Poison x('}) : this.setState({currentPrediction: 'Edible :)'});
    }).catch((err) => {
      console.error(err);
    })
  }

  render() {
    return (
      <div>
        Cap Shape
        <input 
          name="capShape"
          type="number"
          onChange={this.handleInputChange}
        />
        Cap Surface
        <input
          name="capSurface"
          type="number"
          onChange={this.handleInputChange}
        />
        Cap Color
        <input
          name="capColor"
          type="number"
          onChange={this.handleInputChange}
        />
        Bruises
        <input
          name="bruises"
          type="number"
          onChange={this.handleInputChange}
        />
        Odor
        <input
          name="odor"
          type="number"
          onChange={this.handleInputChange}
        />
        Gill Attachment
        <input
          name="gillAttachment"
          type="number"
          onChange={this.handleInputChange}
        />
        Gill Spacing
        <input
          name="gillSpacing"
          type="number"
          onChange={this.handleInputChange}
        />
        Gill Size
        <input
          name="gillSize"
          type="number"
          onChange={this.handleInputChange}
        />
        Gill Color
        <input
          name="gillColor"
          type="number"
          onChange={this.handleInputChange}
        />
        Stalk Shape
        <input
          name="stalkShape"
          type="number"
          onChange={this.handleInputChange}
        />
        Stalk Root
        <input
          name="stalkRoot"
          type="number"
          onChange={this.handleInputChange}
        />
        Stalk Surface Above Ring
        <input
          name="stalkSurfaceAboveRing"
          type="number"
          onChange={this.handleInputChange}
        />
        Stalk Surface Below Ring
        <input
          name="stalkSurfaceBelowRing"
          type="number"
          onChange={this.handleInputChange}
        />
        Stalk Color Above Ring
        <input
          name="stalkColorAboveRing"
          type="number"
          onChange={this.handleInputChange}
        />
        Stalk Color Below Ring
        <input
          name="stalkColorBelowRing"
          type="number"
          onChange={this.handleInputChange}
        />
        Veil Type
        <input
          name="veilType"
          type="number"
          onChange={this.handleInputChange}
        />
        Veil Color
        <input
          name="veilColor"
          type="number"
          onChange={this.handleInputChange}
        />
        Ring Number
        <input
          name="ringNumber"
          type="number"
          onChange={this.handleInputChange}
        />
        Ring Type
        <input
          name="ringType"
          type="number"
          onChange={this.handleInputChange}
        />
        Spore Print Color
        <input
          name="sporePrintColor"
          type="number"
          onChange={this.handleInputChange}
        />
        Population
        <input
          name="population"
          type="number"
          onChange={this.handleInputChange}
        />
        Habitat
        <input
          name="habitat"
          type="number"
          onChange={this.handleInputChange}
        />
        <div onClick={this.handleSubmit} className="btn">Get Prediction</div>
        <div>Current Prediction: {this.state.currentPrediction}
        </div>
      </div>
    )
  }
}

export default Mushrooms;
