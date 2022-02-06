import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface Data {
  status: boolean;
  message: string;
  payload: Record<string, any>;
}

const prisma = new PrismaClient();

const ordersHandler = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {
    body,
    method,
    query: { userId, orderId },
  } = req;

  let data = {
    status: false,
    message: "Bad Method",
    payload: {},
  };
  let orders = [];
  let order = null;

  try {
    switch (method) {
      case "GET":
        orders = await prisma.order.findMany();
        data.status = true;
        data.message = "Successful GET";
        data.payload = { orders };
        res.status(200).json(data);
        break;
      //
      case "POST":
        order = await prisma.order.create({
          data: {
            title: body.title,
            description: body.description,
            userId: userId as string,
          },
        });
        if (!order) throw new Error("Failed POST");
        data.status = true;
        data.message = "Successful POST";
        data.payload = { order };
        res.status(200).json(data);
        break;
      //
      case "PUT":
        order = await prisma.order.update({
          where: {
            id: orderId as string,
          },
          data: {
            title: body.title,
            description: body.description,
          },
        });
        if (!order) throw new Error("Failed PUT");
        data.status = true;
        data.message = "Successful PUT";
        data.payload = { order };
        res.status(200).json(data);
        break;
      //
      case "DELETE":
        order = await prisma.order.delete({
          where: {
            id: orderId as string,
          },
        });
        data.status = true;
        data.message = "Successful DELETE";
        data.payload = { order };
        res.status(200).json(data);
        break;
      default:
        res.status(500).json(data);
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(400).json(data);
  }
};

export default ordersHandler;
