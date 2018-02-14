import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 305px;
  width: 280px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  border-radius: 10px;
  margin: 15px;
  background: #f79d00; /* fallback for old browsers */
  background: -webkit-linear-gradient(135deg, #f79d00, 70%, #64f38c); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(135deg, #e0f7ff, 70%, #f4cff7); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
`;

export default Wrapper;
