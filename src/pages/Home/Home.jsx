import React, { Component } from 'react';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: '',
      description: '',
      client: '',
      contractor: '',
      uploadedFile: [],
      max_x: '',
      min_x: '',
      max_y: '',
      min_y: '',
      max_z: '',
      min_z: '',
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  };
  render() {
    const {
      projectName,
      description,
      client,
      contractor,
      uploadedFile,
      max_x,
      min_x,
      max_y,
      min_y,
      max_z,
      min_z,
    } = this.state;
    return (
      <div className='row'>
        <div className=' col-12 ol-sm-12 col-md-12 col-lg-12 col-xl-5 col-xxl-5'>
          <h1 className=' my-4'>Create a prototype.</h1>
          <form onSubmit={this.handleSubmit}>
            {/* Project Name */}
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control'
                name='projectName'
                value={projectName}
                onChange={this.handleInputChange}
                id='ProjectName'
                placeholder='Project Name'
              />
              <label htmlFor='ProjectName'>Project Name</label>
            </div>
            {/* Project Description */}
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control'
                name='description'
                value={description}
                onChange={this.handleInputChange}
                id='description'
                placeholder='Project Description'
              />
              <label htmlFor='description'>Project Description</label>
            </div>
            {/* Client */}
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control'
                name='client'
                value={client}
                onChange={this.handleInputChange}
                id='Client'
                placeholder='Client'
              />
              <label htmlFor='Client'>Client</label>
            </div>
            {/* Contractor */}
            <div className='form-floating mb-3'>
              <input
                type='text'
                className='form-control'
                name='contractor'
                value={contractor}
                onChange={this.handleInputChange}
                id='Contractor'
                placeholder='Contractor'
              />
              <label htmlFor='Contractor'>Contractor</label>
            </div>
            {/* CSV file is upload */}
            <div className='input-group mb-3'>
              <label className='input-group-text' htmlFor='csvFile'>
                CSV File upload
              </label>
              <input type='file' className='form-control' id='csvFile' />
            </div>
            {/* Max_X */}
            <div className='form-floating mb-3'>
              <input
                type='number'
                className='form-control'
                name='max_x'
                value={max_x}
                onChange={this.handleInputChange}
                id='max_X'
                placeholder='Max_X'
              />
              <label htmlFor='max_X'>Max_X</label>
            </div>
            {/* min_x */}
            <div className='form-floating mb-3'>
              <input
                type='number'
                className='form-control'
                name='min_x'
                value={min_x}
                onChange={this.handleInputChange}
                id='min_x'
                placeholder='Min_X'
              />
              <label htmlFor='min_x'>Min_X</label>
            </div>
            {/* max_y */}
            <div className='form-floating mb-3'>
              <input
                type='number'
                className='form-control'
                name='max_y'
                value={max_y}
                onChange={this.handleInputChange}
                id='max_y'
                placeholder='Max_Y'
              />
              <label htmlFor='max_y'>Max_Y</label>
            </div>
            {/* min_y */}
            <div className='form-floating mb-3'>
              <input
                type='number'
                className='form-control'
                name='min_y'
                value={min_y}
                onChange={this.handleInputChange}
                id='min_y'
                placeholder='Min_Y'
              />
              <label htmlFor='min_y'>Min_Y</label>
            </div>
            {/* max_z */}
            <div className='form-floating mb-3'>
              <input
                type='number'
                className='form-control'
                name='max_z'
                value={max_z}
                onChange={this.handleInputChange}
                id='max_z'
                placeholder='Max_Z'
              />
              <label htmlFor='max_z'>Max_Z</label>
            </div>
            {/* min_z */}
            <div className='form-floating mb-3'>
              <input
                type='number'
                className='form-control'
                name='min_z'
                value={min_z}
                onChange={this.handleInputChange}
                id='min_z'
                placeholder='min_Z'
              />
              <label htmlFor='min_z'>Min_Z</label>
            </div>
            <button type='submit' className='btn btn-outline-secondary'>
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
