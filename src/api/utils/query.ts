import { IComment } from './../../database/models/comment';
import { Document } from 'mongoose';
import User from '../../database/models/user';
import Request from '../../database/models/request';
import Comment from '../../database/models/comment';

/**
 * @description It finds user by email from the mongo DB
 *
 * @param {string} email
 * @returns {Promise<Document>}
 */
export const findUserByEmail = async (email: string): Promise<Document> => {
  return await User.findOne({ email });
};

/**
 * @description It finds request by id from the mongo DB
 *
 * @param {string} id
 * @returns {Promise<Document>}
 */
export const findRequestById = async (id: string): Promise<Document> => {
  return await Request.findById(id);
};

/**
 * @description It finds user by id from the mongo DB
 *
 * @param {string} id
 * @returns {Promise<Document>}
 */
export const findUserById = async (id: string): Promise<Document> => {
  return await User.findOne({ _id: id }).exec();
};

/**
 * @description This is responsible for creating comment for a particular request
 *
 * @param {IComment} {
 *   content,
 *   request,
 *   commentBy,
 * }
 * @returns {Promise<Document>}
 */
export const createComment = async ({
  content,
  request,
  commentBy,
}: IComment): Promise<Document> => {
  const comment = new Comment({
    content,
    request: request._id,
    commentBy: commentBy._id,
  });

  return await comment.save();
};

/**
 * @description This is responsible for finding comment by a request
 *
 * @param {string} requestId
 * @param {*} { limit = 5, offset = 0 }
 * @returns {Promise<Document[]>}
 */
export const findCommentByRequest = async (
  requestId: string,
  { limit = 5, offset = 0 }: any,
): Promise<Document[]> => {
  const allComment = await Comment.find({ request: requestId })
    .limit(limit)
    .skip(offset);

  return allComment;
};
