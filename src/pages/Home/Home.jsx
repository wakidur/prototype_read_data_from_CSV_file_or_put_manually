/* eslint-disable no-use-before-define */
import React, { Component } from 'react';
import * as XLSX from 'xlsx';

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      csvFileHeadeFormet: false,
      csvHeader: ['KP', 'X', 'Y', 'Z'],
      projectName: '',
      description: '',
      client: '',
      contractor: '',
      max_x: '',
      min_x: '',
      max_y: '',
      min_y: '',
      max_z: '',
      min_z: '',
      isStepOneShow: true,
      isStepOneDisabled: true,
      isSubmit: true,
      formSubmitSuccess: false,
    };
  }

  // Helper
  arraysEqual = (a, b) => {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    // If you don't care about the order of the elements inside
    // the array, you should sort both arrays here.
    // Please note that calling sort on an array will modify that array.
    // you might want to clone your array first.

    for (let i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  };

  maxValue = (lists, prop) =>
    [...lists].reduce((prev, curr) => (prev.prop > curr.prop ? prev : curr));
  minValue = (lists, prop) =>
    [...lists].reduce((prev, curr) => (prev.prop < curr.prop ? prev : curr));

  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
    const {
      projectName,
      description,
      client,
      contractor,
      max_x,
      min_x,
      max_y,
      min_y,
      max_z,
      min_z,
    } = this.state;
    if (projectName && description && client && contractor) {
      this.setState({ isStepOneDisabled: false });
    } else if (!projectName || !description || !client || !contractor) {
      this.setState({ isStepOneDisabled: true });
    }
    if (max_x && min_x && max_y && max_y && min_y && max_z && min_z) {
      this.setState({ isSubmit: false });
    } else if (
      !max_x ||
      !min_x ||
      !max_y ||
      !max_y ||
      !min_y ||
      !max_z ||
      !min_z
    ) {
      this.setState({ isSubmit: true });
    }
  };

  nextStep = () => {
    const { isStepOneShow } = this.state;
    this.setState({ isStepOneShow: !isStepOneShow });
  };

  handleSubmitSuccessAlert = () => {
    this.setState({ formSubmitSuccess: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    localStorage.getItem('ABCEngine');
    if (!localStorage.getItem('ABCEngine')) {
      localStorage.setItem('ABCEngine', JSON.stringify([this.state]));
    } else {
      const oldData = JSON.parse(localStorage.getItem('ABCEngine'));
      const addNewObjToOldData = [...oldData, this.state];
      localStorage.setItem('ABCEngine', JSON.stringify(addNewObjToOldData));
    }
    this.setState({
      projectName: '',
      description: '',
      client: '',
      contractor: '',
      max_x: '',
      min_x: '',
      max_y: '',
      min_y: '',
      max_z: '',
      min_z: '',
      isStepOneShow: true,
      isStepOneDisabled: true,
      isSubmit: true,
      formSubmitSuccess: true,
    });
  };

  // process CSV data
  processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(
      /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
    );

    if (this.arraysEqual(headers, this.state.csvHeader)) {
      const list = [];
      for (let i = 1; i < dataStringLines.length; i++) {
        const row = dataStringLines[i].split(
          /,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/
        );
        if (headers && row.length == headers.length) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            let d = row[j];
            if (d.length > 0) {
              if (d[0] == '"') d = d.substring(1, d.length - 1);
              if (d[d.length - 1] == '"') d = d.substring(d.length - 2, 1);
            }
            if (headers[j]) {
              obj[headers[j]] = d;
            }
          }

          // remove the blank rows
          if (Object.values(obj).filter((x) => x).length > 0) {
            list.push(obj);
          }
        }
      }
      if (list && list.length > 1) {
        const Max_X = [...list].reduce((prev, curr) =>
          prev.X > curr.X ? prev : curr
        );
        const Min_X = [...list].reduce((prev, curr) =>
          prev.X < curr.X ? prev : curr
        );
        const Max_Y = [...list].reduce((prev, curr) =>
          prev.Y > curr.Y ? prev : curr
        );
        const Min_Y = [...list].reduce((prev, curr) =>
          prev.Y < curr.Y ? prev : curr
        );
        const Max_Z = [...list].reduce((prev, curr) =>
          prev.Z > curr.Z ? prev : curr
        );
        const Min_Z = [...list].reduce((prev, curr) =>
          prev.Z < curr.Z ? prev : curr
        );

        this.setState({
          max_x: Max_X.X,
          min_x: Min_X.X,
          max_y: Max_Y.Y,
          min_y: Min_Y.Y,
          max_z: Max_Z.Z,
          min_z: Min_Z.Z,
          isSubmit: false
        });
      } else {
        this.setState({ csvFileHeadeFormet: false });
      }
      this.setState({ csvFileHeadeFormet: false });
    } else {
      this.setState({
        csvFileHeadeFormet: true,
      });
    }
  };
  // handle file upload
  handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      this.processData(data);
    };
    reader.readAsBinaryString(file);
  };

  render() {
    const {
      csvFileHeadeFormet,
      formSubmitSuccess,
      isStepOneShow,
      isSubmit,
      isStepOneDisabled,
      projectName,
      description,
      client,
      contractor,
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
          {formSubmitSuccess ? (
            <div
              className='alert alert-warning alert-dismissible fade show'
              role='alert'
            >
              Form Data Submit Success
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='alert'
                aria-label='Close'
                onClick={this.handleSubmitSuccessAlert}
              ></button>
            </div>
          ) : null}
          <h1 className=' my-4'>Create a prototype.</h1>
          <form onSubmit={this.handleSubmit}>
            {isStepOneShow ? (
              <section className={`step-one`}>
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
                    required
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
                    required
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
                    required
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
                    required
                  />
                  <label htmlFor='Contractor'>Contractor</label>
                </div>
              </section>
            ) : (
              <section className={`step-two`}>
                <div className=' form-control mb-3'>
                  <p>{projectName ? ` Project Name: ${projectName}` : null}</p>
                  <p>
                    {description
                      ? ` Project Description: ${projectName}`
                      : null}
                  </p>
                  <p>{client ? ` Client: ${projectName}` : null} </p>
                  <p>{contractor ? ` Contractor: ${projectName}` : null}</p>
                </div>
                {/* CSV file is upload */}
                <div className='input-group mb-3'>
                  <label className='input-group-text' htmlFor='csvFile'>
                    CSV File upload
                  </label>
                  <input
                    type='file'
                    className={`form-control ${
                      csvFileHeadeFormet ? 'is-invalid' : ''
                    }`}
                    id='csvFile'
                    accept='.csv'
                    onChange={this.handleFileUpload}
                  />
                  {csvFileHeadeFormet ? (
                    <div className='invalid-feedback'>
                      CSV File Header name not matching
                    </div>
                  ) : null}
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    placeholder='Min_Z'
                    required
                  />
                  <label htmlFor='min_z'>Min_Z</label>
                </div>
              </section>
            )}
            <div className=' d-flex justify-content-center mt-4'>
              <button
                type='button'
                disabled={isStepOneDisabled}
                className='btn  btn-outline-primary me-4'
                onClick={this.nextStep}
              >
                Step 1
              </button>
              <button
                type='submit'
                disabled={isSubmit}
                className='btn  btn-outline-primary'
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
