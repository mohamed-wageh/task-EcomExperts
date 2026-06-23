import { describe, it, expect } from 'vitest';
import { getQuantityKey, buildInitialQuantities, buildInitialSelectedVariants } from './stateHelpers';

describe('stateHelpers', () => {
  describe('getQuantityKey', () => {
    it('returns productId when no variant is provided', () => {
      expect(getQuantityKey('cam_1')).toBe('cam_1');
    });

    it('returns productId when variant is _default', () => {
      expect(getQuantityKey('cam_1', '_default')).toBe('cam_1');
    });

    it('returns formatted string when variant is provided', () => {
      expect(getQuantityKey('cam_1', 'black')).toBe('cam_1__black');
    });
  });

  const mockSteps = [
    {
      id: 'cameras',
      products: [
        {
          id: 'cam_1',
          initialQuantities: { _default: 2 }
        },
        {
          id: 'cam_2',
          variants: [{ id: 'white' }, { id: 'black' }],
          initialQuantities: { white: 1, black: 0 }
        }
      ]
    }
  ];

  describe('buildInitialQuantities', () => {
    it('builds a flat quantity map from nested steps data', () => {
      const result = buildInitialQuantities(mockSteps);
      expect(result).toEqual({
        'cam_1': 2,
        'cam_2__white': 1,
        'cam_2__black': 0
      });
    });

    it('handles empty steps gracefully', () => {
      expect(buildInitialQuantities([])).toEqual({});
    });
  });

  describe('buildInitialSelectedVariants', () => {
    it('selects the first variant for products with variants', () => {
      const result = buildInitialSelectedVariants(mockSteps);
      expect(result).toEqual({
        'cam_2': 'white'
      });
    });

    it('ignores products without variants', () => {
      const result = buildInitialSelectedVariants(mockSteps);
      expect(result['cam_1']).toBeUndefined();
    });
  });
});
