# Written Evaluation

## Question 1

If the blog post data was coming from an API, we would need to consider 2 aditional concerns - loading states, and error handling.

In order to handle these concerns the data shoul be fetched using a reducer function, and the bloglist should be wrapped in 2 new components - an ErrorHandler, and a LoadingHandler. This reducer function might use React's useReducer, or might instead use the excellent package useSWR.

If I was writing the function using only React's useReducer, it might look something like

```
const initialState = {
  loading: true,
  error: "",
  data: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SUCCESS":
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case "ERROR":
      return {
        loading: false,
        data: {},
        error: "Something went wrong!",
      };
    default:
      return state;
  }
};

const BlogList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        dispath({ type: "SUCCESS", payload: response.data });
      })
      .catch((error) => {
        dispath({ type: "ERROR" });
      });
  }, []);

  return (
    <LoadingHandler isLoading={state.loading}>
      <ErrorHandler error={state.error}>
        {/*HERE ARE THE BLOGLIST CHILDREN*/}
      </ErrorHandler>
    </LoadingHandler>
  );
};
```

Then LoadingHandler and ErrorHandler would render different components/pages based on conditionals which read the loading and error states respectively.

## Question 2

According to the [nanoid documentation](https://github.com/ai/nanoid#react), you should not use nanoid to generate React key props, since nanoid values are not stable, and key props should be consitent between renders.

Using unstable keys will hurt performance because a list item with an unstable key will always be viewed as "changed" by the react reconciliation process, and will therefore force React to re-render more than is ideal.

For more context see -

- [https://github.com/bbc/simorgh/issues/1489](https://github.com/bbc/simorgh/issues/1489)

- [https://dev.to/bytebodger/comment/1df8g](https://dev.to/bytebodger/comment/1df8g)
