const {PrismaClient} = require ('@prisma/client');
const prisma = new PrismaClient ();
const {getPagination} = require ('../libs/pagination');
const {search, filter, getByType} = require ('../repositories/course');

module.exports = {
  getAllCourse: async (req, res, next) => {
    try {
      let {limit = 10, page = 1} = req.query;
      limit = Number (limit);
      page = Number (page);

      let courses = await prisma.courses.findMany ({
        skip: (page - 1) * limit,
        take: limit,
        select: {
          id: true,
          name: true,
          category: {select: {id: true, name: true}},
        },
      });

      const {_count} = await prisma.courses.aggregate ({
        _count: {id: true},
      });

      let pagination = getPagination (req, _count.id, page, limit);

      res.status (200).json ({
        status: true,
        message: 'Show All Course',
        err: null,
        data: {pagination, courses},
      });
    } catch (err) {
      next (err);
    }
  },

  search: async (req, res, next) => {
    try {
      const result = await search (req);

      res.status (200).json ({
        data: result,
      });
    } catch (err) {
      next (err);
    }
  },

  filter: async (req, res, next) => {
    try {
      const result = await filter (req);

      res.status (200).json ({
        data: result,
      });
    } catch (error) {
      next (error);
    }
  },

  getByType: async (req, res, next) => {
    try {
      const {result, pagination} = await getByType (req);

      res.status (200).json ({
        data: {result, pagination},
      });
    } catch (error) {
      next (error);
    }
  },
};
