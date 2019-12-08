interface PaginationOptions {
  page?: number;
  perPage?: number;
}

export class BaseController {
  static async createPagination(query: any, options: PaginationOptions = {}) {
    const { perPage = 25, page = 1 } = options;
    const [data, count] = await query
      .offset(perPage * page - perPage)
      .limit(perPage)
      .getManyAndCount();
    const pageCount = Math.ceil(count / perPage);

    return {
      data,
      pageInfo: {
        total: count,
        pageCount: pageCount,
        nextPage: pageCount > 1 ? page + 1 : null,
        prevPage: page - 1 < 1 ? null : page - 1,
        firstPage: pageCount > 0 ? 1 : null,
        lastPage: pageCount > 1 ? pageCount - 1 : null,
        currentPage: +page
      }
    };
  }
}
