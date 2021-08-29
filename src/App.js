import { Container } from '@material-ui/core';
import Header from 'components/Header';
import NotFound from 'components/NotFound';
import Album from 'features/Album';
import Counter from 'features/Counter';
import Product from 'features/Product';
import Todo from 'features/Todo';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';

function App() {
    return (
        <div>
            <Header />
            <Container fixed>
                <Switch>
                    <Redirect from="/home" to="/" exact />
                    <Route path="/" component={Counter} exact />
                    <Route path="/todo" component={Todo} exact />
                    <Route path="/album" component={Album} exact />
                    <Route path="/products" component={Product} />
                    <Route component={NotFound} />
                </Switch>
            </Container>
        </div>
    );
}

export default App;
