import React, { Component } from "react";
import AUX from "../../../hoc/Aux_";
import { Link } from "react-router-dom";
import Editable from "react-x-editable";
import $ from "jquery";
import CurrencyService from "../../../services/CurrencyService"

class CurrencyList extends Component {
  render() {
    // $().DataTable();
    // $(document).ready(function() {
    //   $("#mydtable").DataTable();
    // });


    const [selectedCurrency, setSelectedCurrency] = useState({ name: "" });

    useEffect(() => {
      getStatus();
    }, []);

    const getStatus = () => {
      CurrencyService.getAllCurrency()
        .then((res) => {
          let updatedData = { ...data };
          updatedData.rows = [];
          res.data.map((item, index) => {
            updatedData.rows.push({
              name: item.name ? item.name : "none",
              exchangeRate: item.exchangeRate ? item.exchangeRate : "none",
              // action: (
              //   <div className="row flex-nowrap">
              //     <Button
              //       onClick={() => {
              //         setSelectedStatus(item);
              //         toggleEdit();
              //       }}
              //       color="info"
              //       size="sm"
              //     >
              //       Edit
              //     </Button>
  
              //     <Button
              //       color="danger"
              //       size="sm"
              //       onClick={() => {
              //         setSelectedStatus(item);
              //         toggleDelete();
              //       }}
              //     >
              //       Delete
              //     </Button>
              //   </div>
              // ),
            });
          });
          console.log("countries", updatedData);
          setData(updatedData);
        })
        .catch((err) => console.log(err));
    };
    return (
      <AUX>
        <div className="page-content-wrapper">
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card m-b-20">
                  <div className="card-body">
                    <h4 className="mt-0 header-title">Currencies</h4>
                    <p className="text-muted m-b-30 font-14">
                      All Currency and their exchange rates
                    </p>

                    <table className="table table-editable" id="mydtable">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Exchange Rate</th>
                        </tr>
                      </thead>
                      
                      <tr>
                        <td>1</td>
                        <td data-original-value="11">11</td>
                        <td>
                          <Editable dataType="text" mode="inline" value="1" />
                        </td>
                        <td>
                          <Editable
                            dataType="text"
                            mode="inline"
                            value="1.99"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td data-original-value="22">22</td>
                        <td>
                          <Editable dataType="text" mode="inline" value="2" />
                        </td>
                        <td>
                          <Editable
                            dataType="text"
                            mode="inline"
                            value="2.99"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td data-original-value="33">33</td>
                        <td>
                          <Editable dataType="text" mode="inline" value="3" />
                        </td>
                        <td>
                          <Editable
                            dataType="text"
                            mode="inline"
                            value="3.99"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>4</td>
                        <td data-original-value="44">44</td>
                        <td>
                          <Editable dataType="text" mode="inline" value="4" />
                        </td>
                        <td>
                          <Editable
                            dataType="text"
                            mode="inline"
                            value="4.99"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>5</td>
                        <td data-original-value="55">55</td>
                        <td>
                          <Editable dataType="text" mode="inline" value="5" />
                        </td>
                        <td>
                          <Editable
                            dataType="text"
                            mode="inline"
                            value="5.99"
                          />
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AUX>
    );
  }
}

export default CurrencyList;
