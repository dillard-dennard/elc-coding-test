import React from 'react';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            error: null,
            originData: [],
        };
    }

    componentDidMount() {
        fetch('http://localhost:3035/api/products') // Update the URL based on your server configuration
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                this.setState({ data, originData: data });
            })
            .catch(error => {
                this.setState({ error });
            });
    }

    componentDidUpdate(prevProps) {
        // Check if the props have changed
        if (this.props.searchTerm !== prevProps.searchTerm) {
            this.searchFunc(this.props.searchTerm);
        }
    }

    searchFunc = (value) => {
        let { originData } = this.state;
        if (value === undefined || value?.length === 0) { this.setState({ data: [...originData] }); return; }
        const filteredItems = originData.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
        this.setState({
            data: [...filteredItems]
        })
    }
    /**
     * Renders the default app in the window, we have assigned this to an element called root.
     * 
     * @returns JSX
     * @memberof Home
    */
    render() {
        const { data, error } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        }

        if (!data) {
            return <div>Loading...</div>;
        }
        return (
            <section id="home">
                <div className="content">
                    {data && (
                        <div className='grid'>
                            {data.map(item => (
                                <div className='item' key={item._id}>
                                    <span className='description'>{item.about}</span>
                                    <img className='picture' src={item.picture} />
                                    <div className='name'>{item.name}</div>
                                    <div className='price'>{`$${item.price}`}</div>
                                    <div className='tags'>{
                                        item.tags?.map((i, index) => (<span key={i}>{index == 0 ? `${i}` : `, ${i}`}</span>))}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        );
    }


}

// Export out the React Component
export default Home;