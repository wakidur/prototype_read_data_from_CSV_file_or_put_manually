import React, { Component } from 'react';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectList: [],
    };
  }

  componentDidMount() {
    const projectList = JSON.parse(localStorage.getItem('ABCEngine'));
    this.setState({ projectList });
  }

  downloadPDF = () => {
    const { projectList } = this.state;
    const docDefinition = {
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: [100, 150, 150, 150, '*'],

            body: [
              ['S.No', 'Name', 'Desc', 'Client', 'Contractor'],
              ...projectList.map((o, i) => [
                i + 1,
                o.projectName,
                o.description,
                o.client,
                o.contractor,
              ]),
            ],
          },
        },
      ],
    };
    pdfMake.createPdf(docDefinition).download('result.pdf');
  };

  render() {
    const { projectList } = this.state;
    return (
      <div className='row'>
        <div className=' d-flex justify-content-between mt-4 mb-5'>
          <h3>Project List </h3>
          {projectList && projectList.length > 0 ? (
            <button
              type='button'
              onClick={this.downloadPDF}
              className='btn btn-outline-success'
            >
              Download
            </button>
          ) : null}
        </div>

        <table className='table table-hover table-bordered'>
          <thead className=''>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Client</th>
              <th>Contractor</th>
              <th>Max_X</th>
              <th>Min_X</th>
              <th>Max_Y</th>
              <th>Min_Y</th>
              <th>Max_Z</th>
              <th>Min_Z</th>
            </tr>
          </thead>
          {projectList && projectList.length > 0 ? (
            <tbody>
              {projectList.map((item, index) => (
                <tr key={index}>
                  <td>{item.projectName}</td>
                  <td>{item.description}</td>
                  <td>{item.client}</td>
                  <td>{item.contractor}</td>
                  <td>{item.max_x}</td>
                  <td>{item.min_x}</td>
                  <td>{item.max_y}</td>
                  <td>{item.min_y}</td>
                  <td>{item.max_z}</td>
                  <td>{item.min_z}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              <tr>
                <td colSpan='10'> Project list is not found </td>
              </tr>
            </tbody>
          )}
        </table>
      </div>
    );
  }
}

export default Result;
