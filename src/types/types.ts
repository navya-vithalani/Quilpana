export type GameCategory = 'Play' | 'Skill' | 'Default';
export type TemplateCategory = 'User' | 'Default';


export interface Game {
  id: string;
  name: string;
  creator: string;
  thumbnailUrl: string;
  description: string;
  tags: string[];
  category: GameCategory; // Replaced productivityRating
  upvotes: number;
  downvotes: number;
  createdAt: Date;
}

/**
 * Represents a project template for Creator Mode.
 */
export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;
  category: TemplateCategory;
  tags: string[];
  createdAt: Date;
  creator: string;
  usageCount: number;
}

// Badge type
export interface Badge {
  id: string;
  name: string;
  image?: string; // optional, can be used for badge icons
}


export interface AITemplate {
  id: string;       // use the template name
  name: string;
  model: string;    // type of model, e.g., "Prediction", "Classification"
  image?: string;   // optional, can be URL or local path
}


/**
 * Enum for the user's voting status on a game.
 */
export enum VoteStatus {
  Up = 'up',
  Down = 'down',
  None = 'none',
}

/**
 * Type for the user's votes, mapping game IDs to their vote status.
 */
export type UserVotes = Record<string, VoteStatus>;
