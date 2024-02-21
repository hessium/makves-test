import './sidebar.scss';
import React from 'react';
import classnames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from '../../assets/logo.png'

const routes = [
    { title: 'Home', icon: 'fas-solid fa-house', path: '/' , selected: true},
    { title: 'Sales', icon: 'chart-line', path: '/sales' , selected: false},
    { title: 'Costs', icon: 'chart-column', path: '/costs', selected: false },
    { title: 'Payments', icon: 'wallet', path: '/payments', selected: false },
    { title: 'Finances', icon: 'chart-pie', path: '/finances', selected: false },
    { title: 'Messages', icon: 'envelope', path: '/messages', selected: false },
];

const bottomRoutes = [
    { title: 'Settings', icon: 'sliders', path: '/settings' },
    { title: 'Support', icon: 'phone-volume', path: '/support' },
];




export default class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpened: true,
            routes : routes,
        };
    }

    toggleSidebar = () => {
        this.setState((state) => ({ isOpened: !state.isOpened }) );
    };

    goToRoute = (path) => {
        console.log(`going to "${path}"`);
        this.setState({
            ...this.state.routes,
            routes: this.state.routes.map(route => {
                if (route.path === path) {
                    route.selected = true;
                } else {
                    route.selected = false
                }
                return route;
            })
        })
    };

    render() {
        const { isOpened } = this.state;
        const containerClassnames = classnames('sidebar', { opened: isOpened });

        return (
            <div className={ containerClassnames }>
                <button className='sidebar__change' onClick={ this.toggleSidebar }>
                    <FontAwesomeIcon icon={ isOpened ? 'angle-left' : 'angle-right' } />
                </button>
                <nav className='sidebar__wrapper'>
                    <div className="sidebar__logo">

                            <img
                                src={ logo }
                                alt="TensorFlow logo"
                            />
                            <span className='visible'>TensorFlow</span>
                    </div>

                    <div className='sidebar__body'>
                        {
                            this.state.routes.map((route) => (
                                <div className={route.selected ? "sidebar__item selected" : 'sidebar__item'} key={ route.title } onClick={ () => this.goToRoute(route.path) }>
                                    <FontAwesomeIcon icon={ route.icon } />
                                    <span className='visible'>{ route.title }</span>
                                </div>
                            ))
                        }
                    </div>

                    <div className='sidebar__footer'>
                        {
                            bottomRoutes.map((route) => (
                                <div className='sidebar__item' key={ route.title } onClick={ () => this.goToRoute(route.path) }>
                                    <FontAwesomeIcon icon={ route.icon } />
                                    <span className='visible'>{ route.title }</span>
                                </div>
                            ))
                        }
                    </div>
                </nav>
            </div>
        );
    }
}
