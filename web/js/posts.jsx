'use strict';
// форма 
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            titleClass: '',
            bodyClass: '',
            titleMsg: '',
            bodyMsg: '',
        };
    }
    // изменение элементов 
    elChanger(key, e) {
        this.setState({
            [key]: e.target.value,
        });
    }
    formToDo(e) {
        e.preventDefault();
        let data = new FormData;
        let els = ['title', 'body'];
        for(let i = 0; i < els.length; i++)
            data.append('Post[' + els[i] + ']', this.state[els[i]]);
        fetch('/post/save', {
            method: 'post',
            body: data,
        }).then((resp) => resp.json()).then((ret) => {
            for(let i = 0; i < els.length; i++) {
                this.setState({[els[i] + 'Class']: ' is-valid'});
                this.setState({[els[i] + 'Msg']: ''});
            }

            // всё сохранилось надо обновить список
            if (ret.ok) {
                this.props.onTaDa();
                for(let i = 0; i < els.length;i++)
                    this.setState({
                        [els[i]]: '',
                        [els[i] + 'Class']: '',
                        [els[i] + 'Msg']: '',
                    });
                return;
            }
            
            //form.find(':input.form-control').removeClass('is-invalid is-valid').addClass('is-valid');
            if (ret.errors)
                for(let k in ret.errors){
                    this.setState({[k + 'Class']: ' is-invalid'});
                    this.setState({[k + 'Msg']: ret.errors[k].join(<br/>)})

                    /*let el=form.find(':input.form-control[name="Post['+k+']"]');
                    el.toggleClass('is-invalid is-valid');
                    el.siblings('.invalid-feedback').html(ret.errors[k]);*/
                }
            
            
        });
        
    }
    render(){
        return( 
            <form onSubmit={this.formToDo.bind(this)} className='post-form'>
                <div className='title form-group'>
                    <input className={'form-control'+this.state.titleClass} placeholder='Заголовок' type='text' name='title' value={this.state.title} onChange={this.elChanger.bind(this,'title')}/> 
                    {this.state.titleMsg? <div className="invalid-feedback">{this.state.titleMsg}</div> : '' }
                    
                </div>
                <div className='body form-group'>
                    <textarea className={'form-control'+this.state.bodyClass} name='body' placeholder='Контент' value={this.state.body} onChange={this.elChanger.bind(this,'body')}/> 
                    {this.state.bodyMsg? <div className="invalid-feedback">{this.state.bodyMsg}</div> : '' }
                </div>
                <div className='actions'>
                    <input type='submit' className='btn btn-primary' value='Отправить'/>
                </div>
            </form>);
    }
};
// блок управления сортировкой .. 
class SorterList extends React.Component
{
    btns = [
        {type: 'random', title:'Случайный порядок', cssClass: 'fa-random'},
        {type: 'first-min', title:'Последние за минуту', cssClass: 'fa-hourglass-start'},
        {type: 'plain', title:'Хронологический порядок', cssClass: 'fa-sort-numeric-down'},
    ];
    constructor(props) { 
        super(props);
        this.state = {active: 'random'};
    }

    stClick(type) {
        this.setState({active: type});
        this.props.onSortChange(type);
    }
    render() {
        const btns = this.btns.map((el) => (<span key = {el.type} onClick = {this.stClick.bind(this, el.type)} className={"btn btn-light" + (this.state.active == el.type ? ' active' : '')} datatype = {el.type} title = {el.title}><i className = {'fa ' + el.cssClass}/></span>)
        );
        return <div className="sort-types btn-group">{btns}</div>
    }
}
// список контента .. 
class PostList extends React.Component
{
    constructor(props) {
        super(props);
        this.state={sortType: 'random', pList:[]};
    }
    componentDidMount() {
        this.sortChanger(this.state.sortType);
    }
    componentDidUpdate() {
        if (!this.props.upd) {
            return;
        }
        this.sortChanger(this.state.sortType);
        this.props.updReset();
    }
    sortChanger(type) {
        /*if (!need && type!='random' && type==this.state.sortType)
            return ;*/
        this.setState({sortType: type});
        fetch('/post', {
            method: 'post',
            body: 'sortType=' + type,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        }).then((resp) => resp.json()).then((ret) =>{
            if (ret.ok)
                this.setState({pList: ret.list});
        });
    }
    render() {
        const list = this.state.pList.map((el, ind) => (<div key={ind} className='item'>
            <div className='head'>
                <span className="date">{el.created}</span>
                <span className="title">{el.title}</span>
            </div>
            <div className='body'>{el.body}</div>
        </div>));
        return <div className='post-list'>
            <SorterList sort={this.state.sortType} onSortChange={this.sortChanger.bind(this)}/>
            <div className='content'>{list}</div>
        </div>
    }
}
// собствено приложение ... 
class App extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {needToUpd: true};
    }
    updateList(data) {
        this.setState({needToUpd: true});
    }
    render() {
        return (<div className='app-wrap'>
            <Form onTaDa= {this.updateList.bind(this)}/>
            <PostList upd= {this.state.needToUpd} updReset={() => {this.setState({needToUpd:false})}}/>
        </div>);
    }
};

ReactDOM.render(
  <App/>,
  document.getElementById('app')
);

