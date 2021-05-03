import React, { useEffect, useState, useMemo } from 'react';
import { number } from 'prop-types';
import { Line } from 'react-chartjs-2';
import { getNTopStoryIds, getAllStoryDetails } from '../api';
import { convertStoriesToChartData } from '../utils';
import NumberInput from '../components/numberInput';

function App({
  defaultQuerylimit
}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [queryLimit, setQueryLimit] = useState(defaultQuerylimit);
  const [inputValidationText, setInputValidationText] = useState('');
  const [errorText, setErrorText] = useState('');

  const checkQueryLimitValue = () => {
    if (queryLimit === '') {
      setInputValidationText('Your input value is not a number. Please enter a number as input value.')
      return false;
    }
    return true;
  }

  const onQueryLimitChange = (value) => {
    if (value !== '') {
      setInputValidationText('');
    }

    setQueryLimit(value);
  }

  const getAndSetData = async () => {
    if (!checkQueryLimitValue()) return;

    try {
      setErrorText('');
      setIsLoading(true);

      const idsResp = await getNTopStoryIds(queryLimit);
      const allStories = await getAllStoryDetails(idsResp.data);
      const chartData = convertStoriesToChartData(allStories);

      setData(chartData);
      setIsLoading(false)
    } catch (e) {
      setIsLoading(false);
      setErrorText(e.message)
    }
  }

  const chartComp = useMemo(() => {
    return (
      <Line
        data={{
          labels: data?.labels,
          datasets: [{
            data: data?.data,
            fill: true,
            borderColor: "#68b5b5",
            label: 'score'
          }]
        }
        }
      />
    )
  }, [data])

  useEffect(() => {
    getAndSetData();
  }, []);

  return (
    <div className='responsive-container'>
      {isLoading && (
        <h2>Loading...</h2>
      )}

      {errorText && (
        <span className='error-color'>{errorText}</span>
      )}

      {!isLoading && !errorText && (
        <>
          <div className='full-width'>
            <NumberInput min={1} max={50} initialValue={queryLimit} onChange={onQueryLimitChange} />
            <button className='primary-button' onClick={getAndSetData}>Get Data</button>
          </div>
          {inputValidationText !== '' && <span className='error-color'>{inputValidationText}</span>}
          <h2>
            Descendants/Score chart
          </h2>
          {chartComp}
        </>
      )}
    </div>
  );
}

App.propTypes = {
  defaultQuerylimit: number
}

App.defaultProps = {
  defaultQuerylimit: 10
}

export default App;
