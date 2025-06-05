import * as migration_20250604_231304 from './20250604_231304';

export const migrations = [
  {
    up: migration_20250604_231304.up,
    down: migration_20250604_231304.down,
    name: '20250604_231304'
  },
];
