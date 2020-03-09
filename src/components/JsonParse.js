import React from "react";


const API = 'https://storage.googleapis.com/aller-structure-task/test_data.json';
class JsonParse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            isActive: false,
          textValue: '',
        };

        this.approveChange = this.approveChange.bind(this);
      this.updateInput = this.updateInput.bind(this);
      this.approveChange = this.approveChange.bind(this);
    }

     componentDidMount() {
        fetch(API)
            .then(response => response.json())
            .then(news => this.setState({ news: news[0] }));
    }

    deleteItem(index) {
        let conf = confirm('Are you sure?');
        if(conf){
            this.state.news.splice(index, 1);
            this.setState({news: this.state.news});
        }
        else{
        }
        // continue working
    }
  
    handleShow = (arg)=>{
        this.setState({isActive: true})
    };

    updateInput(evt) {
        let values = evt.target.value;
        this.textValue = values;
    }

    approveChange(value) {
        let findElementTitle = document.getElementById(value-1).parentNode.querySelector('.canBeM');
        findElementTitle.innerHTML = this.textValue ;
       this.setState({isActive: false});
    };

    render() {
        const { news } = this.state;
        let elementsId = 0;
        return (
            <div className="main-container">
                {news.map(hit =>
                    <div className="news-container" key={hit.columns[0].objectId} >
                        <div className="row">
                        <div className= {'col-lg-'+hit.columns[0].width}>
                            <h3><a  className='canBeM' href={hit.columns[0].url}  >{hit.columns[0].title}</a></h3><br/>
                            <a href={hit.columns[0].url}>
                                <img src={hit.columns[0].imageUrl+'&height=200'} alt="image"/>
                            </a>
                            <br/>
                            <input type='button' className='delete-elem'   onClick={this.deleteItem.bind(this, elementsId)} id={elementsId++} value='delete'/>
                            <input type='button' className='edit-elem'  onClick={this.handleShow.bind(this, elementsId)}  value='edit'/>

                            <div className={this.state.isActive ? 'add-block' : 'hidden' } >
                            <input type='text' className='text-elem'   placeholder='edit here' onChange={ this.updateInput }/>
                            <input type='button' className='approve-chg' onClick={this.approveChange.bind(this, elementsId)}  value='change text'/>
                            </div>
                        </div>
                        <div className={'col-lg' + (hit.columns[0].width - 12)}> </div>
                    </div>
                    </div>
                )}
            </div>
        );
    }
}

export  default  JsonParse
