import React, { memo } from 'react';

interface IRenderTableLoadingProps {
  colspan: number;
  loading: boolean;
}

const RenderTableLoading: React.FC<IRenderTableLoadingProps> = memo(
  ({ colspan, loading }) => {
    return !loading ? null : (
      <tr>
        <td colSpan={colspan} className='text-center'>
          Loading...
        </td>
      </tr>
    );
  }
);

export default RenderTableLoading;
