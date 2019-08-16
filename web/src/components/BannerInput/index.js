import React, { useState, useRef, useEffect } from 'react';
import { MdPhotoCamera } from 'react-icons/md';
import { useField } from '@rocketseat/unform';
import api from '~/services/api';

import { Container } from './styles';

export default function BannerInput() {
    const { defaultValue, registerField } = useField('avatar');

    const [file, setFile] = useState(defaultValue && defaultValue.id);
    const [preview, setPreview] = useState(defaultValue && defaultValue.url);

    const ref = useRef();
    useEffect(() => {
        if (ref.current) {
            registerField({
                name: 'file_id',
                ref: ref.current,
                path: 'dataset.file',
            });
        }
        // eslint-disable-next-line
  }, [ref.current]);

    async function handleChange(e) {
        const data = new FormData();

        data.append('file', e.target.files[0]);

        const response = await api.post('files', data);

        const { id, url } = response.data;

        setFile(id);
        setPreview(url);
    }

    return (
        <Container>
            <label htmlFor="avatar">
                {preview ? (
                    <img src={preview} alt="" />
                ) : (
                    <div className="add_image">
                        <MdPhotoCamera size={48} color="#FFF" />
                        <span>Selecionar imagem</span>
                    </div>
                )}

                <input
                    type="file"
                    id="avatar"
                    accept="image/*"
                    data-file={file}
                    onChange={handleChange}
                    ref={ref}
                />
            </label>
        </Container>
    );
}
