"use client";
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Task, TaskStatus } from '@/lib/types';
import { TaskCard } from './TaskCard';
import React from 'react';

interface KanbanBoardProps {
    milestoneId: string;
}

const COLUMNS: { id: TaskStatus; title: string }[] = [
    { id: 'todo', title: 'To Do' },
    { id: 'in_progress', title: 'In Progress' },
    { id: 'completed', title: 'Completed' },
];

export const KanbanBoard = ({ milestoneId }: KanbanBoardProps) => {
    // const { tasks, updateTask, updateTaskOrder } = useStore();
    // const milestoneTasks = tasks.filter(t => t.milestoneId === milestoneId);

    const handleDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        // const task = tasks.find(t => t.id === draggableId);
        // if (!task) return;

        // Reorder tasks within the same column
        // const sourceColumnTasks = [...milestoneTasks]
        //     .filter(t => t.status === source.droppableId)
        //     .sort((a, b) => a.order - b.order);

        // const destinationColumnTasks = [...milestoneTasks]
        //     .filter(t => t.status === destination.droppableId)
        //     .sort((a, b) => a.order - b.order);

        // Remove from source
        // const [movedTask] = sourceColumnTasks.splice(source.index, 1);

        if (destination.droppableId === source.droppableId) {
            // Same column reorder
            // sourceColumnTasks.splice(destination.index, 0, movedTask);

            // Update orders for source column
            // const updatedSourceTasks = sourceColumnTasks.map((task, index) => ({
            //     ...task,
            //     order: index,
            // }));

            // Update all tasks with new orders
            // const allOtherTasks = milestoneTasks.filter(t =>
            //     t.status !== source.droppableId
            // );
            // const allUpdatedTasks = [...updatedSourceTasks, ...allOtherTasks];
            // updateTaskOrder(milestoneId, allUpdatedTasks);
        } else {
            // Different column move - update status first
            // updateTask(draggableId, {
            //     status: destination.droppableId as TaskStatus,
            // });

            // Create updated task with new status
            // const updatedTask = {
            //     ...movedTask,
            //     status: destination.droppableId as TaskStatus,
            // };
            
            // destinationColumnTasks.splice(destination.index, 0, updatedTask);

            // Update orders for both columns
            // const updatedSourceTasks = sourceColumnTasks.map((task, index) => ({
            //     ...task,
            //     order: index,
            // }));

            // const updatedDestinationTasks = destinationColumnTasks.map((task, index) => ({
            //     ...task,
            //     order: index,
            // }));

            // Update all tasks with new orders
            // const allOtherTasks = milestoneTasks.filter(t =>
            //     t.status !== source.droppableId && t.status !== destination.droppableId
            // );
            // const allUpdatedTasks = [
            //     ...updatedSourceTasks,
            //     ...updatedDestinationTasks,
            //     ...allOtherTasks
            // ];
            // updateTaskOrder(milestoneId, allUpdatedTasks);
        }
    };

    // Memoized function to get column tasks
    // const getColumnTasks = (columnId: TaskStatus) => {
    //     return milestoneTasks
    //         .filter(t => t.status === columnId)
    //         .sort((a, b) => a.order - b.order);
    // };

    return (
        <>
        
        </>
        // <DragDropContext onDragEnd={handleDragEnd}>
        //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        //         {COLUMNS.map((column) => {
        //             const columnTasks = getColumnTasks(column.id);

        //             return (
        //                 <motion.div
        //                     key={column.id}
        //                     initial={{ opacity: 0, y: 20 }}
        //                     animate={{ opacity: 1, y: 0 }}
        //                     transition={{ duration: 0.3 }}
        //                 >
        //                     <Card className="h-full bg-background/50 backdrop-blur-sm border-muted">
        //                         <CardHeader className="pb-3 border-b">
        //                             <CardTitle className="text-sm font-semibold flex items-center justify-between">
        //                                 <span className="capitalize">{column.title}</span>
        //                                 <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full min-w-6 text-center">
        //                                     {columnTasks.length}
        //                                 </span>
        //                             </CardTitle>
        //                         </CardHeader>
        //                         <CardContent className="p-4">
        //                             <Droppable droppableId={column.id}>
        //                                 {(provided, snapshot) => (
        //                                     <div
        //                                         ref={provided.innerRef}
        //                                         {...provided.droppableProps}
        //                                         className={`min-h-[400px] transition-all duration-200 rounded-lg p-2 ${
        //                                             snapshot.isDraggingOver
        //                                                 ? 'bg-primary/10 border-2 border-dashed border-primary/30'
        //                                                 : 'bg-transparent'
        //                                         }`}
        //                                     >
        //                                         <div className="space-y-3">
        //                                             {columnTasks.map((task, index) => (
        //                                                 <Draggable
        //                                                     key={task.id}
        //                                                     draggableId={task.id}
        //                                                     index={index}
        //                                                 >
        //                                                     {(provided, snapshot) => (
        //                                                         <div
        //                                                             ref={provided.innerRef}
        //                                                             {...provided.draggableProps}
        //                                                             {...provided.dragHandleProps}
        //                                                             className={`transform transition-transform ${
        //                                                                 snapshot.isDragging 
        //                                                                     ? 'scale-105 rotate-2 shadow-lg' 
        //                                                                     : ''
        //                                                             }`}
        //                                                         >
        //                                                             <TaskCard
        //                                                                 task={task}
        //                                                                 isDragging={snapshot.isDragging}
        //                                                             />
        //                                                         </div>
        //                                                     )}
        //                                                 </Draggable>
        //                                             ))}
        //                                         </div>
        //                                         {provided.placeholder}
        //                                     </div>
        //                                 )}
        //                             </Droppable>
        //                         </CardContent>
        //                     </Card>
        //                 </motion.div>
        //             );
        //         })}
        //     </div>
        // </DragDropContext>
    );
};